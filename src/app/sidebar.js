"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronDown, ChevronRight } from "lucide-react";

import { useMenuData } from "@/hooks/useMenuData";
import { getUser } from "@/api/getUser";

export default function Sidebar({ open }) {
  let userDetails = getUser();
  const UserRole = userDetails?.userData?.roleName;

  const { data, isLoading } = useMenuData(UserRole);

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuID) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuID]: !prev[menuID],
    }));
  };

  // Add Appointment menu
  const appointmentMenu = {
    menuID: 'appointment-menu',
    menuName: 'Appointment',
    menuPath: null,
    menuChild: [
      {
        menuID: 'book-appointment',
        menuName: 'Book Appointment',
        menuPath: '/appointments/Book-Appointments'
      }
    ]
  };

  // Add Invoice menu
  const invoiceMenu = {
    menuID: 'invoice-menu',
    menuName: 'Invoice',
    menuPath: null,
    menuChild: [
      {
        menuID: 'generate-invoice',
        menuName: 'Generate Invoice',
        menuPath: '/invoice/generate-invoice'
      }
    ]
  };

  // Add Enquiry menu
  const enquiryMenu = {
    menuID: 'enquiry-menu',
    menuName: 'Enquiry',
    menuPath: null,
    menuChild: [
      {
        menuID: 'new-enquiry',
        menuName: 'New Enquiry',
        menuPath: '/enquiry/new-enquiry'
      },
      {
        menuID: 'enquiry-followups',
        menuName: 'Enquiry Followups',
        menuPath: '/enquiry/enquiry-followups'
      }
    ]
  };

  // Append Appointment, Invoice, and Enquiry menus to the data
  const menuData = data ? [...data, appointmentMenu, invoiceMenu, enquiryMenu] : [appointmentMenu, invoiceMenu, enquiryMenu];

  if (isLoading) return <div>Loading...</div>;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full transition-all duration-300 border-r border-[#4DB8AC]/30 shadow-sm bg-gradient-to-b from-[#4DB8AC]/5 via-white/90 to-[#1E6B8C]/5 dark:bg-gradient-to-b dark:from-[#1E6B8C]/20 dark:via-gray-900/90 dark:to-[#4DB8AC]/10 text-foreground",
        open ? "w-64" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-[#4DB8AC]/30">
        {open ? (
          <Image src="/medivardaan-logo.png" width={50} height={60} alt="MediVardaan Logo" className="object-contain " />
        ) : (
          <Image src="/medivardaan-logo.png" width={40} height={40} alt="MediVardaan Logo" className="object-contain" />
        )}
      </div>

      <nav className="mt-6 space-y-1">
        {menuData?.map((menu) => {
          const hasChildren = menu.menuChild && menu.menuChild.length > 0;

          if (!hasChildren) {
            return (
              <Link
                key={menu.menuID}
                href={menu.menuPath || "#"}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                  open ? "justify-start" : "justify-center"
                )}
              >
                <div className="w-6 h-6 flex items-center justify-center rounded bg-[#4DB8AC] text-white text-xs">
                  {menu.menuName?.charAt(0)}
                </div>

                {open && <span>{menu.menuName}</span>}
              </Link>
            );
          }

          // ✔ Has Children → Show Collapsible
          return (
            <Collapsible
              key={menu.menuID}
              open={openMenus[menu.menuID]}
              onOpenChange={() => toggleMenu(menu.menuID)}
            >
              <CollapsibleTrigger asChild>
                <button
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                  )}
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded bg-[#4DB8AC] text-white text-xs dark:bg-[#1E6B8C]">
                    {menu.menuName?.charAt(0)}
                  </div>

                  {open && (
                    <>
                      <span className="flex-1 text-sm font-medium">
                        {menu.menuName}
                      </span>
                      {openMenus[menu.menuID] ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </>
                  )}
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="ml-8 mt-1 flex flex-col space-y-1">
                  {menu.menuChild.map((child, i) => (
                    <Link
                      key={child.menuID}
                      href={child.menuPath || "#"}
                      className={cn(
                        "text-sm rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground transition-colors",
                        !open && "hidden"
                      )}
                    >
                      {child.menuName || `Child ${i + 1}`}
                    </Link>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </nav>
    </aside>
  );
}
