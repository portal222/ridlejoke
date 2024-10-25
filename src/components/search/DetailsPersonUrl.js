import React from "react";

const DetailsPersonUrl = (props) => {

    return (
        Array.isArray(props.web) ? (
            <tr>
                <td className="navod">Website:</td>
                <td>
                    <ul>
                        {props.web.map((web, id) => (
                            <li key={id} className="link">
                                <a href={`https://www.${web.replace(/%20/g, '').replace(/ /g, '')}`} target="_blank">
                                    {web.replace(/%20/g, '').replace(/ /g, '')}
                                </a>
                            </li>
                        ))}
                    </ul>
                </td>
            </tr>
        ) : (
            <>
                <tr>
                    <td className="navod">Website:</td>
                    <td>
                        <div className="link">
                            <a href={`https://www.${props.web.replace(/%20/g, '').replace(/ /g, '')}`} target="_blank" >
                                {props.web.replace(/%20/g, '').replace(/ /g, '')}
                            </a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="navod">or:</td>
                    <td>
                        <div className="link">
                            <a href={`https://${props.web}`} target="_blank" >
                                {props.web}
                            </a>
                        </div>
                    </td>
                </tr>
            </>
        )
    )
}
export default DetailsPersonUrl;