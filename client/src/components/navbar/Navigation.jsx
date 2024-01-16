import styled, { css } from 'styled-components';
import {
  Link,
  useRouteLoaderData,
  useFetcher,
  useLocation,
} from 'react-router-dom';

const NavLink = styled(Link)`
  border: none;
  outline: none;
  background: none;
  cursor: pointer;

  display: inline-block;

  color: var(--white);
  font-family: inherit;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.5;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  text-decoration: none;
  transition: color var(--transition-duration) var(--transition-timing-function);

  &:hover,
  &:active {
    color: var(--orange);
  }
`;

const NavBar = styled.nav`
  ul {
    list-style-type: none;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
  }

  ${(props) => {
    if (props.$isInHeader) {
      return css`
        display: none;
      `;
    } else if (props.$hamburger) {
      return css`
        ${NavLink} {
          color: var(--black);

          &:hover,
          &:active {
            color: var(--orange);
          }
        }
      `;
    }
  }}

  @media (min-width: 37.5em) {
    ul {
      flex-direction: row;
      gap: 3.4rem;
    }
  }

  @media (min-width: 56.25em) {
    ${(props) => {
      if (props.$isInHeader) {
        return css`
          display: block;
        `;
      }
    }}
  }
`;

function Navigation({ isInHeader, hamburger }) {
  const { userIsAuthenticated, userRoles } = useRouteLoaderData('root');
  const fetcher = useFetcher();
  const location = useLocation();
  const params = new URLSearchParams();
  params.set('from', location.pathname);

  return (
    <NavBar $isInHeader={isInHeader} $hamburger={hamburger}>
      <ul>
        <li>
          <NavLink to="/categories/headphones">headphones</NavLink>
        </li>
        <li>
          <NavLink to="/categories/speakers">speakers</NavLink>
        </li>
        <li>
          <NavLink to="/categories/earphones">earphones</NavLink>
        </li>

        {!userIsAuthenticated ? (
          <li>
            <NavLink to={'/login?' + params.toString()}>login</NavLink>
          </li>
        ) : (
          <>
            {userRoles.includes('admin') && (
              <li>
                <NavLink to="/products/add">create product</NavLink>
              </li>
            )}
            <li>
              <fetcher.Form action="/logout" method="POST">
                <NavLink as="button">logout</NavLink>
              </fetcher.Form>
            </li>
          </>
        )}
      </ul>
    </NavBar>
  );
}

export default Navigation;
