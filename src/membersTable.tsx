import * as React from 'react';
import { MemberEntity } from './model/member';
import { memberAPI } from './api/memberAPI';
import { MemberRow } from './memberRow';
import { MemberHead } from './memberHead';


interface Props {
}

interface State {
    members: Array<MemberEntity> 
}

export class MembersTableComponent extends React.Component<Props, State> {

    constructor(props: Props){
        super(props);
        this.state = {members: []};
    }

    public componentDidMount() {
        memberAPI.getAllMembers().then((members) => 
            this.setState({members: members})
        );
    }

    public render() {
        return (
            <div className="row">
                <h2>Members Page</h2>
                <table className="table">
                    <thead>
                       <MemberHead />
                    </thead>
                    <tbody>
                        {
                            this.state.members.map((member: MemberEntity) => 
                                <MemberRow key={member.id} member={member}/>
                        )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}