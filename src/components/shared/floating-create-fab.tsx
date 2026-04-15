'use client'

import { useRouter } from 'next/navigation'
import { Plus, Image as ImageIcon, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function FloatingCreateFab() {
  const router = useRouter()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-end p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6">
      <div className="pointer-events-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              size="icon"
              className="h-14 w-14 rounded-full bg-[#db1a1a] text-white shadow-[0_14px_36px_rgba(219,26,26,0.38)] hover:bg-[#c41515]"
              aria-label="Create new content"
            >
              <Plus className="h-7 w-7" strokeWidth={2.25} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end" sideOffset={12} className="w-56 border-[rgba(44,104,123,0.12)] bg-white p-1 shadow-lg">
            <DropdownMenuItem
              className="cursor-pointer rounded-xl py-2.5 focus:bg-[#fff6f6]"
              onSelect={() => {
                router.push('/create/image')
              }}
            >
              <ImageIcon className="h-4 w-4 text-[#db1a1a]" />
              <span className="font-medium text-[#24191a]">Add image</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer rounded-xl py-2.5 focus:bg-[#fff6f6]"
              onSelect={() => {
                router.push('/create/profile')
              }}
            >
              <UserRound className="h-4 w-4 text-[#2c687b]" />
              <span className="font-medium text-[#24191a]">Add profile</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
