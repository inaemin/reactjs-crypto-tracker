import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import isDarkAtom from '../atoms';

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-top: 10px;
  font-size: 30px;
  border: none;
  background-color: white;
  :hover {
    color: ${(props) => props.theme.accentColor};
    transition: 0.2s ease-in-out;
    cursor: pointer;
  }
`;

const ButtonLink = styled(Link)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-top: 10px;
  font-size: 27px;
  background-color: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function FixedButton() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <ButtonContainer>
      <Button onClick={toggleDarkAtom}>
        <i className="fa-solid fa-moon" />
      </Button>
      <ButtonLink to="/reactjs-crypto-tracker/">
        <i className="fa-solid fa-house" />
      </ButtonLink>
    </ButtonContainer>
  );
}

export default FixedButton;
