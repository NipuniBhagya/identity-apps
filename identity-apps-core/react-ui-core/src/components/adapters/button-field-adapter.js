/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { useTranslations } from "../../hooks/use-translations";
import { resolveElementText } from "../../utils/i18n-utils";
import { getConnectionLogo } from "../../utils/ui-utils";

const ButtonAdapter = ({ component, handleButtonAction }) => {

    const { translations } = useTranslations();
    const name = component.action && component.action.executors && component.action.executors.length > 0
        ? component.action.executors[0].name : "";

    switch (component.variant) {
        case "PRIMARY":
            return (
                <div className="button mt-4">
                    <button
                        className={ classNames("ui primary fluid large button", component.properties.className) }
                        type={ component.properties.type }
                        name={ name }
                        onClick={ !component.properties.type === "submit" ? handleButtonAction : null }
                    >
                        { resolveElementText(translations, component.properties.text) }
                    </button>
                </div>
            );
        case "SECONDARY":
            return (
                <div className="button mt-4">
                    <button
                        type={ component.properties.type }
                        className={
                            classNames("ui secondary fluid large button",
                                `${ component.properties.className } secondary`)
                        }
                        name={ name }
                        onClick={ !component.properties.type === "submit" ? handleButtonAction : null }
                        style={ component.properties.styles }
                    >
                        { resolveElementText(translations, component.properties.text) }
                    </button>
                </div>
            );
        case "LINK":
            return (
                <div className="button mt-4">
                    <button
                        type={ component.type }
                        className={ `${component.properties.className} link` }
                        style={ component.properties.styles }
                    >
                        { resolveElementText(translations, component.properties.text) }
                    </button>
                </div>
            );
        case "SOCIAL":
            return (
                <div className="social-login mt-4">
                    <button
                        type={ component.properties.type }
                        className={ classNames("ui button", `${ component.properties.className } social`) }
                        name={ name }
                        style={ component.properties.styles }
                        onClick={ () => handleButtonAction(name, {}) }
                    >
                        <img
                            className="ui image"
                            src={ getConnectionLogo(name) }
                            alt="Connection Login icon"
                            role="presentation"></img>
                        <span>{ resolveElementText(translations, component.properties.text) }</span>
                    </button>
                </div>
            );
        default:
            return (
                <div className="button mt-4">
                    <button
                        type={ component.type }
                        name={ name }
                        className={ classNames("ui button", component.properties.className) }
                        style={ component.properties.styles }
                        onClick={ !component.properties.type === "submit" ? handleButtonAction : null }
                    >
                        { resolveElementText(translations, component.properties.text) }
                    </button>
                </div>
            );
    }
};

ButtonAdapter.propTypes = {
    actionHandler: PropTypes.func.isRequired,
    component: PropTypes.shape({
        properties: PropTypes.shape({
            className: PropTypes.string,
            styles: PropTypes.object,
            text: PropTypes.string.isRequired
        }).isRequired,
        type: PropTypes.string,
        variant: PropTypes.string
    }).isRequired
};

export default ButtonAdapter;
