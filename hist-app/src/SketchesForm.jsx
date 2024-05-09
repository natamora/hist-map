import { Button, Form } from "semantic-ui-react";

export default function SketchesForm() {
    return (
        <Form>
            <Form.Input placeholder="Rok" />
            <Form.Input placeholder="Tytuł" />
            <Button type='submit' content='Dodaj' />
        </Form>
    );
}