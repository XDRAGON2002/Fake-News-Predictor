import { render, screen } from "@testing-library/react"
import Article from "../components/Article"

describe("Article component", () => {
    it("Render article", () => {
        render(<Article data={"test - jest"}/>)
        expect(screen.getByTestId("title")).toBeInTheDocument()
        expect(screen.getByTestId("author")).toBeInTheDocument()
        expect(screen.getByTestId("read-more")).toBeInTheDocument()
    })
})