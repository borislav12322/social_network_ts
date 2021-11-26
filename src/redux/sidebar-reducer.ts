export type FriendsSectionType = {
    id: number
    name: string
    photo: string
};
export type SidebarSectionType = {
    friends: Array<FriendsSectionType>
};

let initialState: SidebarSectionType = {
    friends: [
        {id: 1, name: "Rima", photo: ''},
        {id: 2, name: "Maya", photo: ''},
        {id: 3, name: "Nina", photo: ''},
    ]
};

export const sidebarReducer = (state: SidebarSectionType = initialState, action: any): SidebarSectionType => {
  switch (action.type){
      default:
          return state
  }
}

