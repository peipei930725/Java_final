import styled from "styled-components"
import Header from "./Header"

export const lightTheme={
    color:{
        sidebar:'#F5F5F5',
        main:'#fff',
        text:'#000',
        modaloverlay:'rgba(0,0,0,0.5)',
        modalbox:'#fff',
        modalinputbg:'#f5f5f5',
        boxbg:'#f5f5f5',
        boxheaderbg:'#e3e3e3'
    }
}

export const darkTheme={
    color:{
        sidebar:'#2b2d31',
        main:'rgb(49,51,56)',
        text:'#F5F5F5',
        modaloverlay:'rgba(245,245,245,0.5)',
        modalbox:'#121212',
        modalinputbg:'#1e1f22',
        boxbg:'#1e1f22',
        boxheaderbg:'#2b2d31'
    }
}

export const MainApp=styled.div`
    display: flex;
    flex-direction: column;
`

export const HeaderCss=styled.div`
    .switch{
        margin-top: 5%;
    }
    .header{
        font-display: 100%;
        box-shadow: 0 2px 2px rgba(18, 18, 18, 0.1);
    }
    
`

export const Content=styled.div`
    display: flex;
    flex-direction: row;
`

export const SidebarCss=styled.div`
    flex-basis: 20%;
    height: 92vh;
    background-color:${(props) => props.theme.color.sidebar};
    .nav-side{
        text-decoration:none;
        font-size:20px;
        color:${(props) => props.theme.color.text};
    }
    .nav-side:hover{
        text-decoration:none;
        box-shadow: inset -20px -47px rgba(227, 227, 227, 0.5);
    }
`

export const Maincontent=styled.div`
    flex-basis: 80%;
    height: 92vh;
    background-color:${(props) => props.theme.color.main};
`
//Page
export const Modaloverlay=styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .modal-box {
        background-color: ${(props) => props.theme.color.modalbox};
        color:${(props) => props.theme.color.text};
        padding: 20px;
        border-radius: 8px;
        max-width: 500px;
        width: 100%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        /* text-align: center; */
    }
    ::placeholder{
        color:${(props) => props.theme.color.text};
    }
    .form-control{
        border:none;
        background-color:${(props) => props.theme.color.modalinputbg};
        color:${(props) => props.theme.color.text};
       
    }
` 

export const AddContainer=styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    padding: 20px;
    max-width: 80%;
    height: 80%;
    margin: auto;
    align-items: center;
`

export const AddBox=styled.div`
    background-color: ${(props) => props.theme.color.boxbg};
    color:${(props) => props.theme.color.text};
    border-radius: 8px;
    width: 30%;
    height: 50%;
    padding: 20px;
    text-align: center;
    box-shadow: 2px 5px 5px ${(props) => props.theme.color.boxbg};
    .box-header {
        background-color: ${(props) => props.theme.color.boxheaderbg};
        padding: 10px;
        border-radius: 8px 8px 0 0;
        font-size: 18px;
        font-weight: bold;
    }
    .box-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        padding: 20px 0;
        .icon-text {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 10px 0;
        }
        
        .icon-text img {
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }
        
        .icon-text p {
            margin: 0;
            font-size: 16px;
        }
    }
`
export const HistoryAndTransferContainer=styled.div`
    width: 80%;
    margin: 50px auto;
    background-color: ${(props) => props.theme.color.modalbox};
    color:${(props) => props.theme.color.text};
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .section {
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        font-size: 1.2em; 
    }
    
    .section-header {
        font-size: 18px;
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 1px solid #8adbd1;
    }
    
    .section-content {
        list-style-type: none;
        padding: 10px 0;
    }
    
    .section-content li {
        display: block;
        padding: 5px 0;
    }
    
    .section-footer {
        text-align: right;
        color: #8adbd1;
        cursor: pointer;
    }
    
    .section-footer:hover {
        text-decoration: underline;
    }

    .section .row {
        padding-top: 5px;
        padding-bottom: 5px;
        display: flex;
        flex-direction: row;
        align-items: center; 
        flex: 1;
    }
    
    .section .row div {
        flex: 1;
        text-align: center;
    }
    
    .section .row div:first-child {
        text-align: left;
    }
    
    .section .row div:last-child {
        text-align: right;
    }
    
    .section .row button {
        margin: 0 10px;
        border: none;
        width: 50px;
    }
`