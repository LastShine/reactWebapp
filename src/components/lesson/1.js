import React from "react";
import './app.css';

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      gender: '',
      checked: true
    }
  }
  handlerChange(name, event) {
    let newState = {};
    newState[name] = name == 'checked' ? event.target.checked : event.target.value
    this.setState(newState)
  }
  submitHandler(e) {
    e.preventDefault()
    let is = this.state.checked ? '是' : '不是';
    let gender = this.state.gender === 'man' ? '帅锅' : '美女';
    alert(this.state.username + is + gender + '.')
  }
  render() {
    return (
      <form onSubmit={this.submitHandler.bind(this)}>
        <label htmlFor="username">请输入姓名:</label>
        <input type="text" name="username" onChange={this.handlerChange.bind(this,'username')} value={this.state.username} id="username"></input><br/>
        <label htmlFor="checked">是或否:</label>
        <input type="checkbox" name="checked" onChange={this.handlerChange.bind(this,'checked')} checked={this.state.checked} id="checkbox"></input><br/>
        <label htmlFor="gender">请选择:</label>
        <select name="gender" onChange={this.handlerChange.bind(this,'gender')} value={this.state.gender}>
          <option value='man'>帅锅</option>
          <option value='woman'>美女</option>
        </select>
        <br/>
        <button type="submit">提交</button>
      </form>
    )
  }
}

export default Hello;