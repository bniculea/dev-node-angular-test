import {createStore, Action, applyMiddleware, compose, StoreEnhancer} from 'redux';
import {reducer} from './reducer';
import {AppState} from './AppState';

declare var window:any;

const devToolsExtension: StoreEnhancer = (window.devToolsExtension) ? window.devToolsExtension() : (f)=> f;

export const store = createStore<AppState,Action<any>, unknown, unknown>(reducer, compose(devToolsExtension) as StoreEnhancer);