import {MemberEntity} from '../model/member';
import {} from 'core-js';
import {} from 'whatwg-fetch';

class MemberAPI {

    getAllMembers() : Promise<MemberEntity[]> {
        const gitHubMembersUrl: string = 'https://api.github.com/orgs/lemoncode/members';

        return fetch(gitHubMembersUrl)
            .then((response) => this.checkStatus(response))
            .then((response) => this.parseJSON(response))
            .then((data) => this.resolveMembers(data));
    }

    private checkStatus(response: Response): Promise<Response> {
        if(response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            let error = new Error(response.statusText);
            throw error;
        }
    }

    private parseJSON(response: Response): any {
        return response.json();
    }

    private resolveMembers(data: any) : Promise<MemberEntity[]> {
        const members = data.map((gitHubMember) => {
            var member : MemberEntity = {
                id: gitHubMember.id,
                login: gitHubMember.login,
                avatar_url: gitHubMember.avatar_url,
            };
            return member;
        });

        return Promise.resolve(members);
    }
}

export const memberAPI = new MemberAPI();