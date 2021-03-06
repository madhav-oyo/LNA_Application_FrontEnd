import React, { Component } from 'react'
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

class RequestTableMUI extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: []
        }
        axios.get(`http://localhost:8080/request/status/notall`)
            .then(response => {
                this.setState({
                    requests : Array.from(response.data)
                })
                // console.log(this.state.requests)
            })
            .catch(error => {
                console.log(error)
            });
        this.renderTableDataMUI = this.renderTableDataMUI.bind(this)
    }

    renderTableDataMUI() {
        return Array.from(this.state.requests).map((request) => {
            const {
                request_id,
                status,
                student_id,
                purpose,
                expectedInTime,
                expectedOutTime
            } = request;
            return (
                <TableRow key={request_id}>
                    <TableCell align="center">{student_id}</TableCell>
                    <TableCell align="center">{purpose}</TableCell>
                    <TableCell align="center">{status}</TableCell>
                    <TableCell align="center">{expectedOutTime}</TableCell>
                    <TableCell align="center">{expectedInTime}</TableCell>
                    <TableCell align="center">
                        <Button type="button" variant="contained" onClick={() => {
                            axios.post(`http://localhost:8080/trip/${student_id}`)
                                .then(response => {
                                    console.log(response)
                                })
                                .catch(error => {
                                    console.log(error)
                                });
                            axios.post(`http://localhost:8080/request/all/${request_id}`, "started")
                                .then(response => {
                                    console.log(response)
                                })
                                .catch(error => {
                                    console.log(error)
                                });
                            document.location.reload()
                        }}>
                            Check Out
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    render() {
        return (
            <div>
                <h3>Request Table Table</h3>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Student Id</TableCell>
                                <TableCell align="center">Purpose</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Expected Out Time</TableCell>
                                <TableCell align="center">Expected In Time</TableCell>
                                <TableCell align="center">Check Out</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderTableDataMUI()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default RequestTableMUI;