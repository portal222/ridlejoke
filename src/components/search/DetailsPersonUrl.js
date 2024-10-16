import React from "react";

const DetailsPersonUrl = (props) => {

    console.log("props urla", props.web);
    // const cleanUrl = decodeURIComponent(props.web.trim().replace(/\s+/g, ''));
    const cleanUrl = props.web.replace(/%20/g, '').replace(/ /g, '');
    // const cleanUrl = props.web.split(` `).join(`-`);
    // const cleanUrl = encodeURI(props.web);

    console.log("decodiranje url", cleanUrl)

    return (
        <tr>
            <td className="navod">Website:</td>
            <td className="nameComm">
                <a href={`https://www.${cleanUrl}`} target="_blank">
                    {cleanUrl}
                </a>
            </td>
        </tr>
    )
}
export default DetailsPersonUrl;