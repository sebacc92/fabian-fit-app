import { component$ } from "@builder.io/qwik";

export const Footer = component$(() => {
    return (
        <footer class="bg-muted dark:bg-background">
            <div class="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div class="py-4 border-t border-muted-foreground/20 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Fit App. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
});
