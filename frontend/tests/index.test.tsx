import { render, screen } from "@testing-library/react"
import Home from "../pages/index"

describe("Home page", () => {
    it("Render home page", () => {
        render(<Home />)
        expect(screen.getByTestId("form")).toBeInTheDocument()
    })
})