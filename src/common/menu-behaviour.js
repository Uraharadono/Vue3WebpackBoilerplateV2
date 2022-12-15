import ajax from '@/common/ajax';

export function menuBehaviour() {
    (function () {
        "use strict";
        window.addEventListener("load", (event) => {
            let body = document.body;
            body.classList.add("loaded");
            menu();
            setMenuToggle();
            setSearchListener();
            removeMenuPaddingWhenMenuNotShown();
            setVerticalNavbarToggle();
            resolveUserInfo();
        });

        function setMenuToggle() {
            let overlay = document.getElementById("side-bar-overlay");
            let toggleBtn = document.getElementById("toggle-menu");
            let menu = document.getElementById("side-bar");
            // let menu = document.getElementById("sideMenu");
            let layout = document.getElementsByClassName("layout")[0];
            let closeBtn = document.getElementById("close-btn");

            if (!(menu && layout)) {
                return;
            }

            let toggleMenu = function () {
                menu.classList.toggle("opened");
                layout.classList.toggle("side-bar-opened");
            };

            if (overlay) {
                overlay.addEventListener("click", toggleMenu);
            }

            if (toggleBtn != null) {
                toggleBtn.addEventListener("click", toggleMenu);
            }

            if (closeBtn) {
                closeBtn.addEventListener("click", toggleMenu);
            }
        }

        function setVerticalNavbarToggle() {
            let isToggled = false;

            let toggleBtn = document.getElementById("vertical-navbar-toggle");
            let sideBar = document.getElementById("side-bar");
            let main = document.getElementById("main-content");
            let horizonalNavbar = document.getElementById("horizonal-navbar");
            let toggleIcon = document.getElementById("toggle-vertical-menu-icon");

            if (!(toggleBtn && sideBar && main && horizonalNavbar)) {
                return;
            }

            let toggleMenu = function() {
                if (isToggled) {
                    sideBar.style.visibility = "visible";
                    main.style.paddingLeft = "17.5rem";
                    horizonalNavbar.style.paddingLeft = "17.5rem";

                    toggleIcon.classList.remove("fa-flip-horizontal");
                } else {
                    sideBar.style.visibility = "hidden";
                    main.style.paddingLeft = "0";
                    horizonalNavbar.style.paddingLeft = "0";

                    toggleIcon.classList.add("fa-flip-horizontal");

                }

                isToggled = !isToggled;
            };

            if (toggleBtn != null) {
                toggleBtn.addEventListener("click", toggleMenu);
            }
        }

        function menu() {
            try {
                let elements = document
                    .getElementsByClassName("app-menu")[0]
                    .getElementsByClassName("menu-item has-sub");

                let parentElements = [];
                let childElements = [];
                for (let i = 0; i < elements.length; i++) {
                    parentElements.push(elements[i].firstChild)
                    let tempElements = elements[i]
                        .getElementsByTagName("ul")[0]
                        .getElementsByTagName("li")
                    for (let i = 0; i < tempElements.length; i++)
                        childElements.push(tempElements[i].firstChild)
                }

                // Parent menu items
                let parentMenuDelegate = function () {
                    // This will allow only single list item to be open
                    // for (var i = 0; i < elements.length; i++) {
                    // 	elements[i].classList.remove("active");
                    // 	var sub = elements[i].getElementsByClassName("sub")[0];
                    // 	sub.style.maxHeight = null;
                    // }
                    if (this.parentNode.classList.contains("active")) {
                        this.parentNode.classList.remove("active");
                        let sub = this.parentNode.getElementsByClassName("sub")[0];
                        sub.style.maxHeight = null;
                    } else {
                        this.parentNode.classList.add("active");
                        let sub = this.parentNode.getElementsByClassName("sub")[0];
                        sub.style.maxHeight = sub.scrollHeight + 5 + "px";
                    }
                };
                for (let i = 0; i < parentElements.length; i++) {
                    parentElements[i].addEventListener("click", parentMenuDelegate, false);
                }

                // Child menu items
                let childMenuDelegate = function () {
                    if (this.parentNode.classList.contains("active")) {
                        this.parentNode.classList.remove("active");
                    } else {
                        // Remove selection from other menu items - remove class "menu-item active"
                        let activeMenuItems = document.getElementsByClassName("menu-item active");
                        for (let i= 0; i < activeMenuItems.length; i++)
                            activeMenuItems[i].classList.remove("active");

                        // Remove selection from menu items that have subs - remove class "menu-item has-sub active"
                        let activeParentMenuItems = document.getElementsByClassName("menu-item has-sub active");
                        for (let i= 0; i < activeParentMenuItems.length; i++)
                            activeParentMenuItems[i].classList.remove("active");

                        // Then add active class to currently clicked menu item
                        this.parentNode.classList.add("active");
                    }
                };
                for (let i = 0; i < childElements.length; i++) {
                    childElements[i].addEventListener("click", childMenuDelegate, false);
                }

            } catch (error) {
                // Sometimes elements cannot be found, so just let it fall trough
            }
        }

        // This is the old menu function, problem with it was that when you click on menu item, menu would collapse
        // Since this design was by intention at the time, I want to have backup of this file here
        // To make sure if something happens in the future that I have it
        //function menu() {
        //    try {
        //        let elements = document
        //            .getElementsByClassName("app-menu")[0]
        //            .getElementsByClassName("menu-item has-sub")

        //        let parentElements = [];
        //        let childElements = [];
        //        for (let i = 0; i < elements.length; i++) {
        //            parentElements.push(elements[i].firstChild)
        //            let tempElements = elements[i]
        //                .getElementsByTagName("ul")[0]
        //                .getElementsByTagName("li")
        //            for (let i = 0; i < tempElements.length; i++)
        //                childElements.push(tempElements[0].firstChild)
        //        }

        //        console.log(parentElements)

        //        let menuDelegate = function () {
        //            // This will allow only single list item to be open
        //            // for (var i = 0; i < elements.length; i++) {
        //            // 	elements[i].classList.remove("active");
        //            // 	var sub = elements[i].getElementsByClassName("sub")[0];
        //            // 	sub.style.maxHeight = null;
        //            // }

        //            if (this.classList.contains("active")) {
        //                this.classList.remove("active");
        //                let sub = this.parentNode.getElementsByClassName("sub")[0];
        //                sub.style.maxHeight = null;
        //            } else {
        //                this.classList.add("active");
        //                let sub = this.parentNode.getElementsByClassName("sub")[0];
        //                sub.style.maxHeight = sub.scrollHeight + "px";
        //            }
        //        };

        //        for (let i = 0; i < elements.length; i++) {
        //            // elements[i].addEventListener("click", menuDelegate, false);
        //            parentElements[i].addEventListener("click", menuDelegate, false);
        //            childElements[i].addEventListener("click", menuDelegate, false);
        //        }
        //    } catch (error) {
        //        // Sometimes elements cannot be found, so just let it fall trough
        //    }
        //}

        function setSearchListener() {
            let pageTitle = document.getElementById("page-title");
            let searchBtn = document.getElementById("toggle-search");
            let pageSearch = document.getElementById("page-search");

            if (searchBtn) {
                searchBtn.addEventListener("click", function () {
                    searchBtn.classList.toggle("active");
                    pageSearch.classList.toggle("show");
                    pageTitle.classList.toggle("hide");
                });
            }
        }

        function removeMenuPaddingWhenMenuNotShown() {
            let elements = document.getElementsByClassName("app-menu");

            // if there are no elements, that means we have to remove
            if (elements.length > 0) {
                // DO NOTHING
                // IT's Not login or registration or somwhere where menu is not SHOWN
                // document.getElementsByClassName("nav-bar")[0].style.paddingLeft = "17.5rem";
                // document.getElementsByClassName("main")[0].style.paddingLeft = "17.5rem";
                // document.getElementsByClassName("content-container")[0].style.margin = "0 auto";
                // document.getElementsByClassName("content-container")[0].style.padding = "1.875rem";
                // document.getElementsByClassName("col col-auto actions-col")[0].style.visibility = "visible";
            }
            else {
                document.getElementsByClassName("nav-bar")[0].style.paddingLeft = "0rem";
                document.getElementsByClassName("main")[0].style.paddingLeft = "0rem";
                document.getElementsByClassName("content-container")[0].style.margin = "0";
                document.getElementsByClassName("content-container")[0].style.padding = "0";
                document.getElementsByClassName("col col-auto actions-col")[0].style.visibility = "hidden";
            }
        }

        function resolveUserInfo() {
            let currentUserInitials = document.getElementById("current-user-initials");
            let currentUserFullName = document.getElementById("current-user-full-name");
            let currentUserSub = document.getElementById("current-user-sub");

            let user = JSON.parse(localStorage.getItem('currentUser'));
            if(user == null)
                return;
            let creds = { 'Authorization': 'Bearer ' + user.token };

            const headers = {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                ...creds
            };

            // Try 1: was returning CORS errors when deployed
            // fetch(API_BASE_URL + '/api/Utilities/GetCurrentGebruikerData', { headers: new Headers(creds) })

            // Try 2: TO BE TESTED
            //fetch(API_BASE_URL + '/api/Utilities/GetCurrentGebruikerData', { headers: new Headers(headers) })
            //    .then(response =>{
            //        console.log("response", response);
            //        if (response.ok)
            //        {
            //            response.json().then(function(data) {
            //                currentUserInitials.innerHTML = data.result.initials.trim();
            //                currentUserFullName.innerHTML = data.result.fullName;
            //            });
            //        }
            //    })
            //    .catch(e => {
            //        console.error(e);
            //    });

            // console.log("ovdje je, skontaj ovo kad zavrsis 2fa, ovo te bas jebe (ne radi mislim kad deployam)...")

            // Try 3: Should work now, only issue is this "response.result"
            ajax.get('/api/Utilities/GetCurrentGebruikerData', {})
                .then(response => {
                    currentUserInitials.innerHTML = response.result.initials.trim();
                    currentUserFullName.innerHTML = response.result.fullName;
                })
                .catch(error => {
                    console.log(error);
                });
        }

    })();
}
