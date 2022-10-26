import '../css/Background.css'

export const Background = ({children}) => {
    const Item = () => {

        return (
            <div className="item">
                <div className="background-item">
                    A
                </div>
                <div className="background-item">
                    B
                </div>
                <div className="background-item">
                    C
                </div>
                <div className="background-item">
                    D
                </div>
                <div className="background-item">
                    E
                </div>
                <div className="background-item">
                    F
                </div>
                <div className="background-item">
                    G
                </div>
                <div className="background-item">
                    H
                </div>
                <div className="background-item">
                    I
                </div>
                <div className="background-item">
                    J
                </div>
                <div className="background-item">
                    K
                </div>
                <div className="background-item">
                    L
                </div>
                <div className="background-item">
                    M
                </div>
                <div className="background-item">
                    N
                </div>
                <div className="background-item">
                    O
                </div>
                <div className="background-item">
                    P
                </div>
                <div className="background-item">
                    Q
                </div>
                <div className="background-item">
                    R
                </div>
                <div className="background-item">
                    S
                </div>
                <div className="background-item">
                    T
                </div>
                <div className="background-item">
                    U
                </div>
                <div className="background-item">
                    V
                </div>
                <div className="background-item">
                    W
                </div>
                <div className="background-item">
                    X
                </div>
                <div className="background-item">
                    Y
                </div>
                <div className="background-item">
                    Z
                </div>
            </div>
        )
    }

    return (
        <div className="background">
            <div className="item-container">
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
            </div>
            {children}
        </div>
    )
}