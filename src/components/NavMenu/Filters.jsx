import { DropdownButton, Dropdown } from 'react-bootstrap'

// eslint-disable-next-line react-refresh/only-export-components, react/display-name
export default function ({ filterBy, setFilterBy }) {
    const handleSelect = (eventKey) => {
        setFilterBy(eventKey)
      }

      const dropdownStyle = {
        fontFamily: 'Arial, sans-serif',  // Change this to your desired font
    }

    return (
        <DropdownButton
        id="dropdown-basic-button"
        variant="warning"
        title="Select Decade"
        onSelect={handleSelect}
        style={dropdownStyle}
        >
            <Dropdown.Item eventKey="All"style={dropdownStyle}>All</Dropdown.Item>
            <Dropdown.Item eventKey="1970">1970's</Dropdown.Item>
            <Dropdown.Item eventKey="1980">1980's</Dropdown.Item>
            <Dropdown.Item eventKey="1990">1990's</Dropdown.Item>
            <Dropdown.Item eventKey="2000">2000's</Dropdown.Item>
            <Dropdown.Item eventKey="2010">2010's</Dropdown.Item>
        </DropdownButton>
    )
}