import { CheckboxContainer, HiddenCheckbox, StyledCheckbox, Icon } from './styles'
import { Checkmark } from "@styled-icons/evaicons-solid";

const CheckBox = ({ checked, onChecked }: { checked: boolean, onChecked: () => void }) => {
    return (
        <CheckboxContainer>
            <HiddenCheckbox checked={checked} onChange={onChecked} />
            <StyledCheckbox checked={checked}>
                <Icon checked={checked}>
                    <Checkmark />
                </Icon>
            </StyledCheckbox>
        </CheckboxContainer>
    )
}

export default CheckBox