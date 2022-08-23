import styled from 'styled-components'

export const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
`;

export const Title = styled.h3`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
    margin: 0.5em;
`;

export const InputWrapper = styled.div`
    margin-bottom: 20px;
    width: 100%;
`;

export const Label = styled.label`
    font-size: 1em;
    font-weight: 600;
    margin-bottom: 1em;
`;

export const Input = styled.input`
    padding: 0.5em;
    border-radius: 4px;
    border: 1px solid #000;
    width: 100%;
    box-sizing: border-box;
    :focus-visible {
        outline: palevioletred solid 1px;
        border: 1px solid palevioletred;
    }
`;

export const Textarea = styled.textarea`
    padding: 0.5em;
    border-radius: 4px;
    border: 1px solid #000;
    width: 100%;
    box-sizing: border-box;
    :focus-visible {
        outline: palevioletred solid 1px;
        border: 1px solid palevioletred;
    }
    resize: none;
`;

export const Button = styled.button`
    padding: 0.5em;
    color: palevioletred;
    background: transparent;
    border-radius: 5px;
    border: 2px solid palevioletred;
    cursor: pointer;
    :hover {
        background: palevioletred;
        color: #fff;
    }
    :active {
        transform: scale(1);
        /* Scaling button to 0.98 to its original size */
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
        /* Lowering the shadow */
}
`;

export const Error = styled.div`
    color: #ff0033;
`;

export const Link = styled.div`
    color: palevioletred;
    cursor: pointer;
    margin-top: 1em;
`;