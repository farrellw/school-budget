import * as React from "react";

interface IProps { message: string };
function Container({ message }: IProps){
    return (
        <div><p>Container</p><p>{message}</p></div>
    )
}

export default Container;