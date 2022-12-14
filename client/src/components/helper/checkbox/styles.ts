import styled from 'styled-components'

export const CheckboxContainer = styled.div`
    display: flex;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

interface CheckboxPropsType {
    checked: boolean
}

export const StyledCheckbox = styled.div<CheckboxPropsType>`
    display: inline-block;
    width: 16px;
    height: 16px;
    background: ${props => props.checked ? 'palevioletred' : '#9292a3'};
    border-radius: 3px;
    transition: all 150ms;

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px pink;
    }
`;

export const Icon = styled.div<CheckboxPropsType>`
    visibility: ${props => props.checked ? 'visible': 'hidden'};
    display: flex;
    color: #fff;
`;