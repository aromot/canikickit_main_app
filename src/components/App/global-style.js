// Palette: https://coolors.co/ef476f-ffd166-06d6a0-118ab2-073b4c

export default {
  '*, ::after, ::before': {
    boxSizing: 'border-box'
  },
  body: {
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
  },
  '.btn': {
    padding: '.25rem .5rem',
    borderRadius: 5,
    border: 0,
    backgroundColor: '#dddddd'
  },
  '.form-group': {
    marginBottom: 10,
    '.form-control': {
      display: 'block',
      border: '1px solid #aaa',
      borderRadius: 5,
      padding: 5,
      width: '100%',
    },
    '.form-validation-error': {
      color: 'red',
      display: 'none'
    },
    '&.error': {
      label: {
        color: 'red',
      },
      '.form-control': {
        borderColor: 'red',
        color: 'red'
      },
      '.form-validation-error': {
        display: 'block'
      }
    }
  }
}