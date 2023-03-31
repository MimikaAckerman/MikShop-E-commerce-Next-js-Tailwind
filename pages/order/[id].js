import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useEffect, useReducer } from "react";
import axios from "axios";

function reducer(state,action){
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state,loading:true,error:''};
            case 'FETCH_FAIL':
                return {...state,loading:false,error:action.payload};
                default:
                    state;
    }
}
