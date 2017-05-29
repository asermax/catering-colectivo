import monkeypatch from 'monkeypatch'
import ContentEditable from 'react-contenteditable'

monkeypatch(ContentEditable.prototype, 'shouldComponentUpdate', function(original, nextProps) {
  // We need not rerender if the change of props simply reflects the user's
  // edits. Rerendering in this case would make the cursor/caret jump.
  return (
    // Rerender if there is no element yet... (somehow?)
    !this.htmlEl
    // ...or if html really changed... (programmatically, not by user edit)
    || ( nextProps.html !== this.htmlEl.innerHTML)
    // ...or if editing is enabled or disabled.
    || this.props.disabled !== nextProps.disabled
  )
})
