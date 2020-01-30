import React from 'react'
import axios from 'axios'
import {BASE_URL} from '../constants/config'

class Equipment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            equipments: [],
            isFetching: false,
        }
    }

    componentDidMount() {
        this.setState({
            isFetching: true
        })
        const self = this
        axios.get(BASE_URL+"/equipments") // ごめんないわ
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                // TODO: errorページへ誘導
            })
            .then(()=> {
                self.setState({
                    isFetching: false
                })
            })

    }

    render() {
        return (
            <div className="content">
                <h1 className="content-title h1-block">備品</h1>
                <EquipmentTable />
            </div>
        )
    }
}

const EquipmentTable = (props) => {
    return (
        <table className="table-stripe">
            <thead>
                <tr>
                    <th>備品名</th>
                    <th>数量</th>
                    <th>備考</th>
                    <th>タグ</th>
                    <th>ひづけ？</th>
                </tr>
            </thead>
            <tbody>
                {
                    EQUIPMENTS.map((equ) => (
                        <EquipmentRow equipment={equ}/>
                    ))
                }
            </tbody>
        </table>
    )
}

const EquipmentRow = (props) => {
    return (
        <tr>
            <td>{props.equipment.name}</td>
            <td>{props.equipment.stock}</td>
            <td>{props.equipment.note}</td>
            <td>{props.equipment.tag.name}</td>
            <td>{props.equipment.date}</td>
        </tr>
    )
}

const EQUIPMENTS = [
    {
        name: "surface",
        stock: 2,
        note: "nanka",
        tag: {
            name: "tag",
        },
        date: "2020/10/10"
    },
    {
        name: "surface",
        stock: 2,
        note: "nanka",
        tag: {
            name: "tag",
        },
        date: "2020/10/10"
    },
    {
        name: "surface",
        stock: 2,
        note: "nanka",
        tag: {
            name: "tag",
        },
        date: "2020/10/10"
    },
]

export default Equipment