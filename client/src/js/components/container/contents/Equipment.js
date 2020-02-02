import React from 'react'
import { connect } from 'react-redux'
import { fetchEquipments } from '../../../actions/action'

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        equipments: state.equipments
    }
}

class ConnectedEquipment extends React.Component {
    componentDidMount() {
        this.props.fetchEquipments()
    }

    render() {
        return (
            <div className="content">
                <h1 className="content-title h1-block">備品</h1>
                <EquipmentTable equipments={this.props.equipments}/>
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
                    props.equipments.map((equ) => (
                        <EquipmentRow equipment={equ} />
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

const Equipment = connect(
    mapStateToProps,
    { fetchEquipments }
)(ConnectedEquipment)

export default Equipment