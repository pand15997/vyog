import logo from './logo.svg';

export const Editors = () => {
    return(
        <div className="col-md-3">
            <a href="#" className="d-block single-post">
                <div className="card p-2">
                    <div className="mb-2 ">
                        <table className="table w-100 mb-0">
                            <tbody>
                                <tr>
                                    <td><img src={logo} width="75px" className="img img-rounded"></img></td>
                                    <td><a href="#" className="nav-link d-inline-block  ">Nanraj</a></td>
                                    <td className="text-right align-baseline"><span className="badge badge-light">Total Post: <span className="badge badge-dark">15</span></span></td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>
                    <p className="text-dark font-italic">I am a senior software designer at Google, Bengaluru (India). I'm best in logo designing.</p>
                    <div></div>
                </div>
            </a>
        </div>
    )
}
