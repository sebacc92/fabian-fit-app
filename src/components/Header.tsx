import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LuMenu, LuX } from '@qwikest/icons/lucide';
import { Button } from "~/components/ui";
import { cn } from "@qwik-ui/utils";

export const Header = component$(() => {
    const isOpen = useSignal(false);
    const isScrolled = useSignal(false);
    const hasOverlay = useSignal(false);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ cleanup }) => {
        const handleScroll = () => {
            isScrolled.value = window.scrollY > 10;
        };

        window.addEventListener("scroll", handleScroll);
        cleanup(() => window.removeEventListener("scroll", handleScroll));
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ cleanup }) => {
        const checkOverlay = () => {
            const overlay = document.querySelector("[data-header-overlay]");
            const isAtTop = window.scrollY === 0;
            hasOverlay.value = !!overlay && isAtTop;
            isScrolled.value = window.scrollY > 10;
        };

        checkOverlay();
        window.addEventListener("scroll", checkOverlay);
        cleanup(() => window.removeEventListener("scroll", checkOverlay));
    });

    return (
        <header
            class={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
                isScrolled.value || !hasOverlay.value
                    ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 border-b"
                    : "bg-transparent",
            )}
        >
            <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <Link href="/" class="flex items-center space-x-2">
                        <span class="text-xl font-bold transition-colors text-foreground dark:text-white">FIT APP</span>
                    </Link>

                    {/* Desktop navigation */}
                    <nav class="hidden md:flex items-center space-x-6 text-foreground dark:text-white">
                        <Link href="/programas" class="text-text-main hover:text-primary-purple transition-colors">
                            Programs
                        </Link>
                        <Link href="/about" class="text-text-main hover:text-primary-purple transition-colors">
                            About
                        </Link>
                        <Link href="/contacto" class="text-text-main hover:text-primary-purple transition-colors">
                            Contact
                        </Link>
                        <Button>Comenzar Entrenamiento</Button>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        class="md:hidden transition-colors text-foreground dark:text-white"
                        onClick$={() => isOpen.value = !isOpen.value}
                    >
                        {isOpen.value ? <LuX /> : <LuMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile navigation */}
            {isOpen.value && (
                <div
                    class="absolute top-16 left-0 right-0 bg-background border-b md:hidden"
                >
                    <nav class="container py-4 px-4 flex flex-col space-y-4">
                        <Link
                            href="/programas"
                            class="text-sm font-medium transition-colors hover:text-primary"
                            onClick$={() => isOpen.value = false}
                        >
                            Programas
                        </Link>
                        <Link
                            href="/blog"
                            class="text-sm font-medium transition-colors hover:text-primary"
                            onClick$={() => isOpen.value = false}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/contacto"
                            class="text-sm font-medium transition-colors hover:text-primary"
                            onClick$={() => isOpen.value = false}
                        >
                            Contacto
                        </Link>
                        <Button onClick$={() => isOpen.value = false}>Comenzar Entrenamiento</Button>
                    </nav>
                </div>
            )}
        </header>
    );
});
