import { DropdownButton, Dropdown } from 'react-bootstrap'

export default function ({ filterBy, setFilterBy }) {
    const handleSelect = (eventKey) => {
        setFilterBy(eventKey)
      }

    return (
        <DropdownButton
        id="dropdown-basic-button"
        title="Select Decade"
        onSelect={handleSelect}
        >
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <Dropdown.Item eventKey="1970">1970's</Dropdown.Item>
            <Dropdown.Item eventKey="1980">1980's</Dropdown.Item>
            <Dropdown.Item eventKey="1990">1990's</Dropdown.Item>
            <Dropdown.Item eventKey="2000">2000's</Dropdown.Item>
            <Dropdown.Item eventKey="2010">2010's</Dropdown.Item>
        </DropdownButton>
    )
}