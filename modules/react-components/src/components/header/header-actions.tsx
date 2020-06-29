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

import { TestableComponentInterface } from "@wso2is/core/models";
import React, { FunctionComponent, ReactElement } from "react";
import { Divider, Grid, Icon, Item, Label, Popup } from "semantic-ui-react";
import moment from "moment";

/**
 * Header actions component prop types.
 */
export interface HeaderActionsPropsInterface extends TestableComponentInterface {
    actions: any;
}

/**
 * Header component.
 *
 * @param {HeaderPropsInterface} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const HeaderActions: FunctionComponent<HeaderActionsPropsInterface> = (
    props: HeaderActionsPropsInterface
): ReactElement => {

    const { actions } = props;
    const nowDate = moment(new Date());

    const showNotifications = (
        <Item.Group>
            <Item style={ { padding: "0.1em 0.7em" } }>
                <Item.Content>
                    <Item.Description>
                        <strong>Notifications</strong>
                    </Item.Description>
                </Item.Content>
            </Item>
            <Divider/>
            {
                actions?.notifications?.notificationList &&  (
                    actions?.notifications?.notificationList.map((notification, index) => (
                        <>
                        <Item key={ index } className="notification-item">
                            <Grid>
                                <Grid.Row columns={ 2 }>
                                    <Grid.Column width={ 3 }>
                                        <Icon color="grey" size="large" name="database" circular/>
                                    </Grid.Column>
                                    <Grid.Column width={ 13 }>
                                        <Item.Content>
                                            <Item.Description>
                                                <strong>{ notification.header }</strong><br/>
                                                { notification.content }
                                            </Item.Description>
                                        </Item.Content>
                                        <Item.Content>
                                            <p style={ { color: "#90949c", fontSize: "11px" } }>
                                                { moment.duration(nowDate.diff(
                                                    moment(notification.timeStamp))).humanize() + " " + "ago" }
                                            </p>
                                        </Item.Content>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Item>
                        </>
                    ))
                )
            }
        </Item.Group>
    );

    return (
        <>
            {
                actions?.notifications?.notificationList instanceof Array
                    ? (
                        <div className="user-notifications">
                            <Popup
                                className="notifications-list"
                                content={
                                    actions?.notifications?.notificationList && (
                                        showNotifications
                                    )
                                }
                                wide
                                trigger={
                                    <Icon size="large" name={ actions.notifications.icon }/>
                                }
                                on="click"
                                hideOnScroll
                                basic
                                position="bottom right"
                            />
                            {
                                actions?.notifications?.notificationList?.length >= 1 && (
                                    <Label size="tiny" circular color="green" floating>
                                        { actions?.notifications?.notificationList?.length }
                                    </Label>
                                )
                            }
                        </div>
                    ) : null
            }
        </>
    )

};
