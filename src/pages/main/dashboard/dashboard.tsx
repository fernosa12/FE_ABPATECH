import { useEffect, useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  Users,
  Database,
  Plus,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "@/store/action/actionUser";

enum MenuType {
  USER = "user",
  TABLES = "tables",
  BASIC = "basic",
  DATATABLES = "datatables",
}

interface DashboardData {
  id: number;
  email: string;
  mobile_number: string;
  foto: string | null;
}

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const dashboard = useSelector(
    (state: RootState) => state.dashboard.dashboard
  );

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuType>(
    MenuType.DATATABLES
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  console.log(dashboard, "ini dashboard data");

  const getTableData = (): DashboardData[] => {
    if (dashboard && Array.isArray(dashboard) && dashboard.length > 0) {
      return dashboard;
    }

    return [];
  };

  const tableData = getTableData();

  const filteredData = tableData.filter(
    (item) =>
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobile_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } bg-slate-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-3 ${
                isSidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <div className="w-6 h-6 bg-slate-900 rounded"></div>
              </div>
              {!isSidebarCollapsed && (
                <span className="font-semibold text-lg">Dashboard</span>
              )}
            </div>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="text-gray-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          {/* User Section */}
          <div className="mb-6">
            <button
              onClick={() => setSelectedMenu(MenuType.USER)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                selectedMenu === MenuType.USER
                  ? "bg-slate-800 text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Users className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span>User</span>}
            </button>
          </div>

          {/* Tables Section */}
          <div>
            <button
              onClick={() => setSelectedMenu(MenuType.TABLES)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                selectedMenu.includes("tables") ||
                selectedMenu === MenuType.DATATABLES
                  ? "bg-slate-800 text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Database className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">Tables</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>

            {!isSidebarCollapsed &&
              (selectedMenu === MenuType.TABLES ||
                selectedMenu === MenuType.DATATABLES) && (
                <div className="ml-8 mt-2 space-y-1">
                  <button
                    onClick={() => setSelectedMenu(MenuType.BASIC)}
                    className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      selectedMenu === MenuType.TABLES ||
                      selectedMenu === MenuType.DATATABLES
                        ? "text-white bg-slate-700"
                        : "text-gray-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Basic
                  </button>
                  <button
                    onClick={() => setSelectedMenu(MenuType.DATATABLES)}
                    className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      selectedMenu === MenuType.DATATABLES
                        ? "text-blue-400 bg-slate-700"
                        : "text-gray-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Data Tables
                  </button>
                </div>
              )}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="text-xs text-gray-500 text-center">2024</div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow">
            {/* Table Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Search
                  </h2>
                  <p className="text-sm text-gray-500">
                    A Table allowing search...
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Today: Jan 11</span>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    <Download className="w-4 h-4 inline mr-1" />
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Search: {filteredData.length} records...
                </p>
              </div>
            </div>

            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                        Foto
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                        Mobile Number
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((row) => (
                        <tr
                          key={row.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {row.id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {row.email}
                          </td>
                          <td className="px-6 py-4">
                            {row.foto ? (
                              <img
                                src={row.foto}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <Users className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {row.mobile_number}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-8 text-center text-gray-500"
                        >
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>Display:</span>
                    <select
                      value={recordsPerPage}
                      onChange={(e) => {
                        setRecordsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="border border-gray-300 rounded px-3 py-1"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>

                  <span>
                    Page {currentPage} of {totalPages}
                  </span>

                  <div className="flex items-center gap-2">
                    <span>Go to page:</span>
                    <input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => {
                        const page = Number(e.target.value);
                        if (page >= 1 && page <= totalPages) {
                          setCurrentPage(page);
                        }
                      }}
                      className="w-16 border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Page Numbers */}
                  {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          </div>
        </main>
      </div>
    </div>
  );
}
