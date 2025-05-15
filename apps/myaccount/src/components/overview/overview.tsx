/**
 * Copyright (c) 2019-2024, WSO2 LLC. (https://www.wso2.com).
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

import Grid from "@oxygen-ui/react/Grid";
import * as Icons from '@oxygen-ui/react-icons';
import Box from "@oxygen-ui/react/Box";
import Button from "@oxygen-ui/react/Button";
import Card from "@oxygen-ui/react/Card";
import CardContent from "@oxygen-ui/react/CardContent";
import Stack from "@oxygen-ui/react/Stack";
import Table from "@oxygen-ui/react/Table";
import TableBody from "@oxygen-ui/react/TableBody";
import TableCell from "@oxygen-ui/react/TableCell";
import TableHead from "@oxygen-ui/react/TableHead";
import TableRow from "@oxygen-ui/react/TableRow";
import Typography from "@oxygen-ui/react/Typography";
import { ExternalLink } from "lucide-react";
import React from "react";
import loginData from "../../data/login-history.json";
import actions from "../../data/actions.json";

export const Overview = () => {
    return (
        <Box>
            <Typography variant="h6" mt={ 4 } mb={ 2 }>
                Quick Actions
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                { actions.map((action, index) => {
                    const Icon = Icons[action.icon];
                    return (
                    <Grid xs={12} sm={6} md={4} lg={2.4} key={index}>
                        <Card
                        variant="outlined"
                        sx={{
                            height: '100%',
                            minHeight: 240,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            borderRadius: '12px',
                            padding: '0px 12px'
                        }}
                        >
                        <CardContent>
                            <Stack alignItems="center" spacing={2}>
                            <Box
                                sx={{
                                backgroundColor: '#F0F0F0',
                                borderRadius: '50%',
                                padding: 2,
                                display: 'inline-flex',
                                }}
                            >
                                {Icon && <Icon sx={{ fontSize: 32 }} />}
                            </Box>
                            <Typography align="center" variant="subtitle1" fontWeight="bold">
                                {action.label}
                            </Typography>
                            <Typography align="center" variant="body2" color="text.secondary">
                                {action.description}
                            </Typography>
                            </Stack>
                        </CardContent>
                        </Card>
                    </Grid>
                    );
                }) }
            </Grid>

            <Box 
                mt={ 4 } 
                sx={{ 
                    backgroundColor: '#FFFFFF', 
                    padding: 4, 
                    borderRadius: 2, 
                    border: '1px solid #0000001f' 
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Recent Login Activity</Typography>
                    <Button variant="outlined" endIcon={ <ExternalLink size={ 16 } /> }>
                        View All
                    </Button>
                </Box>
                <Typography variant="body2" mt={ 1 } mb={ 2 }>
                    Monitor your recent account sign-ins for suspicious activity
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date & Time</TableCell>
                            <TableCell>Device</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { loginData.map((row, index) => (
                            <TableRow key={ index }>
                                <TableCell>
                                    <Typography variant="body2">{ row.date }</Typography>
                                    <Typography variant="caption">{ row.time }</Typography>
                                </TableCell>
                                <TableCell>{ row.device }</TableCell>
                                <TableCell>
                                    { row.location }
                                    <br />
                                    <Typography variant="caption">IP: { row.ip }</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" color="success.main">
                                        ✔ { row.status }
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Button variant="text" size="small">
                                        Report
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};
