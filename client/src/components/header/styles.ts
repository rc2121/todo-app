import styled from 'styled-components'

export const LogoutButton = styled.button`
    padding: 0.5em;
    color: #fff;
    background: transparent;
    border-radius: 5px;
    border: 2px solid #fff;
    cursor: pointer;
    :hover {
        background: #fff;
        color: #000;
    }
    :active {
        transform: scale(1);
        /* Scaling button to 0.98 to its original size */
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
        /* Lowering the shadow */
}
`;