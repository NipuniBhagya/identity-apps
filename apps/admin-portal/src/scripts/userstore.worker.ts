/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
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

import axios  from "axios";
import _ from "lodash";
import { AxiosHttpClient, AxiosHttpClientInstance } from "@wso2is/http";
import { HttpMethods } from "@wso2is/core/models";
import { WebWorker } from "../models/worker";

const ctx: WebWorker = self as any;

onmessage = (e) => {
    const data = e.data;
    const port = e.ports[0];
    const httpClient: AxiosHttpClientInstance = AxiosHttpClient.getInstance();

    switch (data.cmd) {
        case "start":
            if (data.userstoreList) {
                setInterval(() => {
                    const requestConfig = {
                        headers: {
                            "Accept": "application/json",
                            "Access-Control-Allow-Origin": "https://localhost:9002",
                            "Content-Type": "application/json"
                        },
                        method: HttpMethods.GET,
                        params: null,
                        url: "https://localhost:9443/api/server/v1/userstores"
                    };
                    httpClient
                        .request(requestConfig)
                        .then((response) => {
                            if (!_.isEqual(data.userstoreList, response.data)) {
                                port.postMessage({ status: "updated", operation: data.operation });
                                console.log("Polling continues...");
                                self.close();
                            }
                        })
                        .catch((error) => {
                            port.postMessage(error);
                            console.log("Error occurred.");
                            self.close();
                        });
                    // axios.get("https://localhost:9443/api/server/v1/userstores", {
                    //     headers: {
                    //         "Accept": "application/json",
                    //         "Access-Control-Allow-Origin": "https://localhost:9002",
                    //         "Content-Type": "application/json"
                    //     },
                    //     method: HttpMethods.GET,
                    //     params: null,
                    //     url: "https://localhost:9443/api/server/v1/userstores"
                    // };
                    // httpClient
                    //     .request(requestConfig)
                    //     .then((response) => {
                    //         if (!_.isEqual(data.userstoreList, response.data)) {
                    //             port.postMessage({ status: "updated", operation: data.operation });
                    //             console.log("Polling continues...");
                    //             self.close();
                    //         }
                    //     })
                    //     .catch((error) => {
                    //         port.postMessage(error);
                    //         console.log("Error occurred.");
                    //         self.close();
                    //     });
                    axios.get("https://localhost:9443/api/server/v1/userstores", {
                        headers: {
                            "Accept": "application/json",
                            "Access-Control-Allow-Origin": "https://localhost:9002",
                            "Content-Type": "application/json",
                            "Authorization": "Bearer cfe6013d-06ab-34d1-bae8-aeb575315dba",
                            "Cookie": "menuPanel=visible; menuPanelType=main; MSG15906687051960.0949108591688288=true; " +
                                "MSG15906688953620.8264059562634987=true; requestedURI=../../carbon/tenant-dashboard" +
                                "/index.jsp; current-breadcrumb=; MSG15906691384780.47852764637839906=true; " +
                                "JSESSIONID=A21F6A1A2E549E3A84AF7BD1D0560838; commonAuthId=fd8fec92-2a17-4445-ac8a-" +
                                "56a1b911eab6; atbv=997286af-2a30-4ab1-90ca-afaa2e92989c; opbs=be513d2d-9e11-4c38-" +
                                "8af7-c6020a09f6fa"
                        }
                    })
                        .then((response) => {
                            if (!_.isEqual(data.userstoreList, response)) {
                                postMessage( { status: "updated", operation: data.operation }, "https://localhost:9002/admin-portal");
                                console.log("Polling continues...");
                                self.close();
                            }
                        })
                        .catch((error) => {
                            postMessage({ status: "updated", operation: null }, "https://localhost:9002/admin-portal");
                            self.close();
                        });
                }, 3000);
            }
            break;
        case "stop":
            self.close(); // Terminates the worker.
            break;
        default:
            // self.postMessage("Unknown command", "");
    }
};

export default {} as typeof Worker & { new(): Worker };
