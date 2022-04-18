import { render, screen } from "@testing-library/react"
import NavDrawer from "../components/NavDrawer"

describe("Navbar component", () => {
    it("Render navbar", () => {
        render(<NavDrawer />)
        expect(screen.getByTestId("home")).toBeInTheDocument()
        expect(screen.getByTestId("news")).toBeInTheDocument()
    })
})