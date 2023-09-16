export const toggleConfigurator = (state) => {
    state.showConfig = !state.showConfig;
};
export const navbarMinimize=(state) =>{
    const sidenav_show = document.querySelector(".g-sidenav-show");
    if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
    } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
    }
};
export const sidebarType = (state, payload) =>{
    state.isTransparent = payload;
};
export const cardBackground=(state, payload)=> {
    state.color = payload;
};
export const navbarFixed=(state)=> {
    if (state.isNavFixed === false) {
        state.isNavFixed = true;
    } else {
        state.isNavFixed = false;
    }
};
export const toggleEveryDisplay=(state)=> {
    state.showNavbar = !state.showNavbar;
    state.showSidenav = !state.showSidenav;
    state.showFooter = !state.showFooter;
};
export const toggleHideConfig=(state)=> {
    state.hideConfigButton = !state.hideConfigButton;
};