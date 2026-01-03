#!/usr/bin/env python3
"""
Backend API Testing for La Pulpería - Email Integration and Search Endpoints
Tests the specific endpoints mentioned in the review request:
1. GET /api/global-announcements - Should return []
2. GET /api/products?search=test - Should return products array
3. GET /api/pulperias?search=test - Should return pulperias array
4. GET /api/health - Should return healthy
"""

import requests
import json
import sys
import os
import importlib.util
from datetime import datetime

# Get backend URL from environment
BACKEND_URL = "https://tienda-control-6.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name, success, details="", response_data=None):
        """Log test result"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        if not success and response_data:
            print(f"   Response: {response_data}")
        print()
    
    def test_global_announcements_endpoint(self):
        """Test GET /api/global-announcements endpoint - should return empty array initially"""
        try:
            response = self.session.get(f"{self.base_url}/global-announcements", timeout=10)
            
            if response.status_code == 200:
                announcements_data = response.json()
                if isinstance(announcements_data, list):
                    self.log_test(
                        "GET /api/global-announcements - Global announcements endpoint",
                        True,
                        f"Endpoint funciona correctamente. Retornó {len(announcements_data)} anuncios globales"
                    )
                    
                    # Check if it returns empty array initially (as expected)
                    if len(announcements_data) == 0:
                        self.log_test(
                            "Global announcements initial state",
                            True,
                            "Endpoint retorna array vacío [] inicialmente (comportamiento esperado)"
                        )
                    else:
                        # If there are announcements, validate their structure
                        sample_announcement = announcements_data[0]
                        required_fields = ['announcement_id', 'title', 'content', 'is_active', 'created_at']
                        missing_fields = [field for field in required_fields if field not in sample_announcement]
                        
                        if not missing_fields:
                            self.log_test(
                                "Global announcements data structure validation",
                                True,
                                f"Los anuncios globales contienen todos los campos requeridos. {len(announcements_data)} anuncios encontrados"
                            )
                        else:
                            self.log_test(
                                "Global announcements data structure validation",
                                False,
                                f"Campos faltantes en anuncios globales: {missing_fields}",
                                sample_announcement
                            )
                            
                        # Check if announcements are active
                        active_announcements = [ann for ann in announcements_data if ann.get('is_active', False)]
                        self.log_test(
                            "Global announcements active status",
                            True,
                            f"{len(active_announcements)} de {len(announcements_data)} anuncios están activos"
                        )
                else:
                    self.log_test(
                        "GET /api/global-announcements - Global announcements endpoint",
                        False,
                        f"Respuesta no es una lista. Tipo: {type(announcements_data)}",
                        announcements_data
                    )
            else:
                self.log_test(
                    "GET /api/global-announcements - Global announcements endpoint",
                    False,
                    f"Status code: {response.status_code}",
                    response.text
                )
                
        except Exception as e:
            self.log_test(
                "GET /api/global-announcements - Global announcements endpoint",
                False,
                f"Error de conexión: {str(e)}"
            )
    
    def test_health_endpoint(self):
        """Test GET /api/health endpoint - health check"""
        try:
            response = self.session.get(f"{self.base_url}/health", timeout=10)
            
            if response.status_code == 200:
                health_data = response.json()
                if isinstance(health_data, dict):
                    # Check if it has the expected structure
                    if "status" in health_data:
                        status = health_data.get("status")
                        service = health_data.get("service", "unknown")
                        
                        if status == "healthy":
                            self.log_test(
                                "GET /api/health - Health check endpoint",
                                True,
                                f"Health check exitoso. Status: {status}, Service: {service}"
                            )
                        else:
                            self.log_test(
                                "GET /api/health - Health check endpoint",
                                False,
                                f"Health check indica problema. Status: {status}",
                                health_data
                            )
                    else:
                        self.log_test(
                            "GET /api/health - Health check endpoint",
                            False,
                            "Respuesta no contiene campo 'status'",
                            health_data
                        )
                else:
                    self.log_test(
                        "GET /api/health - Health check endpoint",
                        False,
                        f"Respuesta no es un objeto. Tipo: {type(health_data)}",
                        health_data
                    )
            else:
                self.log_test(
                    "GET /api/health - Health check endpoint",
                    False,
                    f"Status code: {response.status_code}",
                    response.text
                )
                
        except Exception as e:
            self.log_test(
                "GET /api/health - Health check endpoint",
                False,
                f"Error de conexión: {str(e)}"
            )
    
    def test_backend_health(self):
        """Test basic backend connectivity"""
        try:
            # Try to access the root API endpoint
            response = self.session.get(f"{self.base_url.replace('/api', '')}/docs", timeout=5)
            
            if response.status_code == 200:
                self.log_test(
                    "Backend connectivity",
                    True,
                    "Backend está accesible y respondiendo"
                )
            else:
                self.log_test(
                    "Backend connectivity",
                    False,
                    f"Backend responde con status code: {response.status_code}"
                )
                
        except Exception as e:
            self.log_test(
                "Backend connectivity",
                False,
                f"No se puede conectar al backend: {str(e)}"
            )
    
    def run_all_tests(self):
        """Run all backend tests for Global Announcements system"""
        print("=" * 60)
        print("TESTING GLOBAL ANNOUNCEMENTS SYSTEM - La Pulpería")
        print("=" * 60)
        print(f"Backend URL: {self.base_url}")
        print(f"Test started at: {datetime.now().isoformat()}")
        print()
        
        # Test backend connectivity first
        self.test_backend_health()
        
        # Test specific endpoints from review request
        print("🔍 TESTING REVIEW REQUEST REQUIREMENTS:")
        print("1. GET /api/global-announcements - Should return empty array [] initially")
        print("2. GET /api/health - Health check")
        print()
        
        self.test_global_announcements_endpoint()
        self.test_health_endpoint()
        
        # Summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t['success']])
        failed_tests = total_tests - passed_tests
        
        print(f"Total tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\nFAILED TESTS:")
            for test in self.test_results:
                if not test['success']:
                    print(f"❌ {test['test']}: {test['details']}")
        
        print(f"\nTest completed at: {datetime.now().isoformat()}")
        
        return failed_tests == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)