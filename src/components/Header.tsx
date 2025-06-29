import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LuMenu, LuX } from '@qwikest/icons/lucide';
import { Button } from "~/components/ui";
import { cn } from "@qwik-ui/utils";
import { _ } from "compiled-i18n";

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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled.value || !hasOverlay.value
                    ? "bg-white/90 backdrop-blur border-b"
                    : "bg-transparent",
            )}
        >
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <Link href="/" class="flex items-center space-x-2">
                        <span class="text-xl font-bold transition-colors text-gray-900 dark:text-white">FIT APP</span>
                    </Link>

                    {/* Desktop navigation */}
                    <nav class="hidden md:flex items-center space-x-6 text-gray-900 dark:text-white">
                        <Link href="/programs" class="text-gray-700 hover:text-purple-600 transition-colors">
                            {_`Programs`}
                        </Link>
                        <Link href="/about" class="text-gray-700 hover:text-purple-600 transition-colors">
                            {_`About`}
                        </Link>
                        <Link href="/contact" class="text-gray-700 hover:text-purple-600 transition-colors">
                            {_`Contact`}
                        </Link>
                        <Button>{_`Start Training`}</Button>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        class="md:hidden transition-colors text-gray-900 dark:text-white"
                        onClick$={() => isOpen.value = !isOpen.value}
                    >
                        {isOpen.value ? <LuX /> : <LuMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile navigation */}
            {isOpen.value && (
                <div
                    class="absolute top-16 left-0 right-0 bg-white border-b md:hidden"
                >
                    <nav class="container py-4 px-4 flex flex-col space-y-4">
                        <Link
                            href="/programs"
                            class="text-sm font-medium transition-colors hover:text-purple-600"
                            onClick$={() => isOpen.value = false}
                        >
                            {_`Programs`}
                        </Link>
                        <Link
                            href="/about"
                            class="text-sm font-medium transition-colors hover:text-purple-600"
                            onClick$={() => isOpen.value = false}
                        >
                            {_`About`}
                        </Link>
                        <Link
                            href="/contact"
                            class="text-sm font-medium transition-colors hover:text-purple-600"
                            onClick$={() => isOpen.value = false}
                        >
                            {_`Contact`}
                        </Link>
                        <Button onClick$={() => isOpen.value = false}>
                            {_`Start Training`}
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
});
