local inToc = true

function Header(elem)
  if elem.text == "NO_TOC" then
    inToc = false
    return {}
  elseif elem.text == "END_NO_TOC" then
    inToc = true
    return {}
  elseif not inToc then
    return elem
  else
    return {}
  end
end