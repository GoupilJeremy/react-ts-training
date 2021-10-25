import * as React from 'react';
import { Color } from './color';
import { ColorPicker } from './colorpicker';
import { ColorDisplayer } from './colordisplayer';
import { SidebarComponent } from './sidebar';
import { MembersTableComponent } from './membersTable';
import { FaceComponent } from './face';

interface Props {

}

interface State {
    userName: string;
    editingUserName: string;
    color: Color;
    isSidebarVisible: boolean;
    satisfactionLevel: number;
}

export class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        
        const defaultUserName = 'defaultUserName';
        this.state = {
            userName: defaultUserName, 
            editingUserName: defaultUserName,
            color: {red: 90, green: 50, blue: 70},
            isSidebarVisible: false,
            satisfactionLevel: 300
        };
    }

    setUserNameState = () => {
        this.setState({userName: this.state.editingUserName});
    }

    updateEditingName = (editingName: string): void => {
      this.setState({editingUserName: editingName});
    }

    setColorState = (newColor: Color) => {
        this.setState({color: newColor});
    }

    toggleSidebarVisibility = () => {
        const newVisibleState = !this.state.isSidebarVisible;

        this.setState({isSidebarVisible: newVisibleState} as State)
    }

    public render() {
        return (
            <>
            <div>
                <input type="range"
                        min="0"
                        max="500"
                        value={this.state.satisfactionLevel}
                        onChange={(event : any) => this.setState({satisfactionLevel :event.target.value} as State)}
                />
                <br/>
                <span>{this.state.satisfactionLevel}</span>
                <br/>
                <FaceComponent level={this.state.satisfactionLevel}/>
            </div>
            <br />
              <SidebarComponent  isVisible={this.state.isSidebarVisible}>
                <h1>Test content</h1>
              </SidebarComponent>
              <MembersTableComponent/>
                <div className="float-right">
                    <button 
                        className="btn btn-default"
                        onClick={this.toggleSidebarVisibility}>
                        Toggle Sidebar
                    </button>
                </div>
                <hr />
                <ColorDisplayer color={this.state.color} />
                <span>Color: [red: {this.state.color.red}, green: {this.state.color.green}, blue: {this.state.color.blue}]</span>
                <ColorPicker color={this.state.color} onColorUpdated={this.setColorState.bind(this)} />
            </>
        );
    }
}       