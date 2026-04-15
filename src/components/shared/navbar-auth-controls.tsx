'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full text-foreground/80 hover:bg-muted hover:text-foreground">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 border-[rgba(44,104,123,0.12)] bg-white p-0 shadow-lg">
        <div className="flex items-start gap-3 p-4">
          <Avatar className="h-11 w-11 shrink-0 border border-border">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="text-sm font-semibold">{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 space-y-0.5">
            <p className="truncate text-sm font-semibold text-[#24191a]">{user?.name ?? 'Signed in'}</p>
            <p className="truncate text-xs text-[#5f4b4d]">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator className="my-0" />
        <div className="p-2">
          <Button
            type="button"
            variant="outline"
            className="w-full justify-center rounded-xl border-[rgba(44,104,123,0.2)] text-[#24191a] hover:bg-[#fff6f6]"
            onClick={() => logout()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
