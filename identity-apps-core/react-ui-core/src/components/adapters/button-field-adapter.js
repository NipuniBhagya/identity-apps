/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import PropTypes from "prop-types";
import React from "react";
import { Button } from "semantic-ui-react";
import { useTranslations } from "../../hooks/use-translations";
import { resolveElementText } from "../../utils/i18n-utils";
import { getConnectionLogo } from "../../utils/ui-utils";

const ButtonAdapter = ({ component, handleButtonAction }) => {

    const { translations } = useTranslations();
    const actionId = (component.action && component.action.id) ? component.action.id : "";

    switch (component.variant) {
        case "PRIMARY":
            return (
                <Button
                    className="ui primary fluid large button mt-4"
                    type={ component.config.type }
                    name={ actionId }
                    onClick={ !component.config.type === "submit" ? handleButtonAction : null }
                >
                    { resolveElementText(translations, component.config.text) }
                </Button>
            );
        case "SECONDARY":
            return (
                <Button
                    type={ component.config.type }
                    className="ui secondary fluid large button mt-4"
                    name={ actionId }
                    onClick={ !component.config.type === "submit" ? handleButtonAction : null }
                    style={ component.config.styles }
                >
                    { resolveElementText(translations, component.config.text) }
                </Button>
            );
        case "LINK":
            return (
                <Button
                    type={ component.type }
                    className="link mt-4"
                    style={ component.config.styles }
                    onClick={ () => handleButtonAction(actionId, {}) }
                >
                    { resolveElementText(translations, component.config.text) }
                </Button>
            );
        case "SOCIAL":
            return (
                <div className="social-login mt-4">
                    <Button
                        type={ component.config.type }
                        className="ui button social"
                        name={ actionId }
                        style={ component.config.styles }
                        onClick={ () => handleButtonAction(actionId, {}) }
                    >
                        <img
                            className="ui image"
                            src={ getConnectionLogo(component.config.action.executor.name) }
                            alt="Connection Login icon"
                            role="presentation"></img>
                        <span>{ resolveElementText(translations, component.config.text) }</span>
                    </Button>
                </div>
            );
        default:
            return (
                <Button
                    type={ component.type }
                    name={ actionId }
                    className="ui button mt-4"
                    style={ component.config.styles }
                    onClick={ !component.config.type === "submit" ? handleButtonAction : null }
                >
                    { resolveElementText(translations, component.config.text) }
                </Button>
            );
    }
};

ButtonAdapter.propTypes = {
    component: PropTypes.shape({
        config: PropTypes.shape({
            text: PropTypes.string.isRequired
        }).isRequired,
        id: PropTypes.string,
        type: PropTypes.string,
        variant: PropTypes.string
    }).isRequired,
    handleButtonAction: PropTypes.func.isRequired
};

export default ButtonAdapter;
