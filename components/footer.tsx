import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-amber-50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <Image src="/images/winni-code-logo.png" alt="Winni Code" width={160} height={45} className="h-auto" />
            </Link>
            <p className="text-gray-700 text-sm mb-6">
              Delivering accurate, timely news and insightful analysis on global events.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild className="hover:bg-amber-100">
                <Link href="https://www.instagram.com/winnicodeofficial" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-gray-600" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-gray-800">Contact Information</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">E-Mail:</p>
                  <a href="mailto:winnicodegarudaofficial@gmail.com" className="hover:text-amber-700 transition-colors">
                    winnicodegarudaofficial@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Call Center:</p>
                  <a href="tel:+6285159932501" className="hover:text-amber-700 transition-colors">
                    6285159932501 (24 Jam)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Administrasi Berkas:</p>
                  <p>
                    Hubungi Admin Telp:{" "}
                    <a href="tel:+6285159932501" className="hover:text-amber-700 transition-colors">
                      +6285159932501
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-gray-800">Address</h3>
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700 mb-1">Cabang Bandung:</p>
                  <p className="leading-relaxed">
                    Jl. Asia Afrika No.158, Kb. Pisang, Kec. Sumur Bandung,
                    <br />
                    Kota Bandung, Jawa Barat 40261
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Cabang Yogyakarta:</p>
                  <p>Bantul, Yogyakarta</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Cabang Jakarta:</p>
                  <p>Bekasi, Jawa Barat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-200 mt-12 pt-6 text-center text-sm text-gray-600">
          <p>Copyright © {new Date().getFullYear()} PT WINNICODE GARUDA TEKNOLOGI</p>
        </div>
      </div>
    </footer>
  )
}
