import { render, screen } from "@testing-library/react"
import Layout from "../components/Layout"

describe("Layout component", () => {
    it("Render layout", () => {
        render(<Layout />)
        expect(screen.getByTestId("layout")).toBeInTheDocument()
    })
})