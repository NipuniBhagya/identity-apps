/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useEffect, useReducer } from "react";
import { useGetUpdatedFeatureGateConfig } from "../../../configs/feature-gate";
import { FeatureGateAction, FeatureGateActionTypes } from "../actions/feature-gate";
import { featureGateConfig } from "../configs/feature-gate";
import { FeatureGateContext } from "../context/feature-gate";
import { FeatureGateInterface } from "../models/feature-gate";

export const featureGateReducer = (
    state: FeatureGateInterface,
    action: FeatureGateAction
): FeatureGateInterface => {
    switch (action.type) {
        case FeatureGateActionTypes.SET_FEATURE_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const FeatureGateProvider = (props: React.PropsWithChildren<any>): React.ReactElement => {
    const { children } = props;
    const defaultFeatureGateConfig: FeatureGateInterface  = { ...featureGateConfig };
    const [ features, dispatch ] = useReducer(featureGateReducer, defaultFeatureGateConfig);

    const updatedFeatureGateConfig: FeatureGateInterface = useGetUpdatedFeatureGateConfig();

    useEffect (() => {
        if (JSON.stringify(features) !== JSON.stringify(updatedFeatureGateConfig)) {
            dispatch({ payload: updatedFeatureGateConfig, type: FeatureGateActionTypes.SET_FEATURE_STATE });
        }
    }, [ updatedFeatureGateConfig ]);

    return (<FeatureGateContext.Provider value={ {  dispatch, features } }>{ children }</FeatureGateContext.Provider>);
};
