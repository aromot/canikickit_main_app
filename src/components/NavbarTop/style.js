import {css} from 'emotion';

export default css`
  background: #073b4c;
  color: white;
  display: flex;
  padding: 10px;
  a {
    color: white;
  }
  .left, .right {
    flex: 1
  }
  .right {
    text-align: right;
  }
  .menu {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: flex-end;
    > li + li {
      margin-left: 20px
    }
  }
`