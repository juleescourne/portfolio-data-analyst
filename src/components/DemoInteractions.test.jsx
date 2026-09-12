import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HousingPredictor from './HousingPredictor';
import GoodreadsExplorer from './GoodreadsExplorer';
import ChurnPredictionPage from '../pages/ChurnPredictionPage';
import housingModel from '../hooks/housingModel';
import ort from '../utils/onnxConfig';
jest.mock('react-plotly.js', () => () => <div data-testid="plot" />);
jest.mock('../hooks/housingModel', () => ({ predict: jest.fn() }));
jest.mock('../hooks/useShapValues', () => ({ useShapValues: () => ({getShapForInputs:()=>null,isLoading:false,error:null}), FEATURE_LABELS:{} }));
jest.mock('../utils/onnxConfig', () => ({ __esModule:true, default: {InferenceSession:{create:jest.fn()},Tensor:jest.fn()},initONNX:jest.fn(),getDataUrl:()=>'/mock-model.onnx' }));
beforeEach(()=>jest.clearAllMocks());
test('Housing removes obsolete results when a scenario or slider changes',async()=>{
 housingModel.predict.mockResolvedValue({predictions:[0,50,100],latitudes:[33,34,35],longitudes:[-120,-119,-118],stats:{min:0,max:100,mean:50,std:40}});
 render(<HousingPredictor/>);fireEvent.click(screen.getByText('Générer la Heatmap'));
 await screen.findByText('Carte du score relatif');
 fireEvent.change(screen.getByRole('slider',{name:'median_income'}),{target:{value:'6'}});
 expect(screen.queryByText('Carte du score relatif')).not.toBeInTheDocument();
});
test('Housing exposes a recoverable error instead of leaving a loading screen',async()=>{
 const spy=jest.spyOn(console,'error').mockImplementation(()=>{});
 housingModel.predict.mockRejectedValue(new Error('offline'));render(<HousingPredictor/>);fireEvent.click(screen.getByText('Générer la Heatmap'));
 expect(await screen.findByRole('alert')).toHaveTextContent('Vérifiez la connexion');
 expect(screen.getByText('Générer la Heatmap')).toBeEnabled();spy.mockRestore();
});
test('Goodreads filters recalculate the catalogue and the ranked rows',()=>{
 render(<GoodreadsExplorer/>);
 fireEvent.change(screen.getByLabelText('Minimum de notes'),{target:{value:'0'}});
 expect(screen.getByText('798')).toBeInTheDocument();
 fireEvent.change(screen.getByLabelText('Langue'),{target:{value:'unknown'}});
 expect(screen.queryByText('798')).not.toBeInTheDocument();
 expect(screen.getAllByRole('row')).toHaveLength(2);
});
test('Churn threshold changes the alert without changing the model probability',async()=>{
 const run=jest.fn().mockResolvedValue({probabilities:{data:new Float32Array([.6,.4])}});ort.InferenceSession.create.mockResolvedValue({run});
 render(<ChurnPredictionPage onBack={()=>{}}/>);
 await screen.findByText('40.0%');expect(screen.getByText('Profil sous le seuil choisi')).toBeInTheDocument();
 fireEvent.change(screen.getByRole('slider',{name:/Seuil d’alerte/}),{target:{value:'.3'}});
 expect(screen.getByText('Alerte : profil à examiner')).toBeInTheDocument();expect(screen.getByText('40.0%')).toBeInTheDocument();expect(run).toHaveBeenCalledTimes(1);
});
test('Churn ignores a late result from a previous profile',async()=>{
 let firstResolve;const run=jest.fn().mockImplementationOnce(()=>new Promise(resolve=>{firstResolve=resolve})).mockResolvedValue({probabilities:{data:new Float32Array([.2,.8])}});
 ort.InferenceSession.create.mockResolvedValue({run});render(<ChurnPredictionPage onBack={()=>{}}/>);
 await waitFor(()=>expect(run).toHaveBeenCalledTimes(1));fireEvent.click(screen.getByText('Inactif'));
 await screen.findByText('80.0%');firstResolve({probabilities:{data:new Float32Array([.6,.4])}});
 await waitFor(()=>expect(screen.getByText('80.0%')).toBeInTheDocument());expect(screen.queryByText('40.0%')).not.toBeInTheDocument();
});
