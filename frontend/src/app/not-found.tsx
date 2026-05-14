import StatusPage from '@/components/UI/StatusPage/StatusPage';

export default function NotFound() {
    return (
        <StatusPage
            code="404"
            title="Page not found"
            description="The link you followed might be broken, or the page may have been removed."
        />
    );
}