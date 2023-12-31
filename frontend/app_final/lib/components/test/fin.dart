import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class Fin extends StatefulWidget {
  const Fin({super.key});

  @override
  State<Fin> createState() => _FinState();
}

class _FinState extends State<Fin> {
  @override
  Widget build(BuildContext context) {
    //final TabController _tabController = TabController(length: 2, vsync: this);

    return Scaffold(
      backgroundColor: Color.fromARGB(255, 255, 255, 255),
        body: SafeArea(
            child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  //mainAxisAlignment: MainAxisAlignment.end,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      //color:Colors.grey,
                      margin: const EdgeInsets.only(top: 0,left: 20),
                      child: Text("Gracias por",
                      style: TextStyle(
                        color:Colors.black,fontWeight: FontWeight.w300,fontSize: 30),),
                    ),
                    Container(
                      margin: const EdgeInsets.only(left: 20),
                      child: Text("Llevar vida a tu HOGAR!",
                      style: TextStyle(fontSize: 30),),
                    ),
                     Container(
                      margin: const EdgeInsets.only(left: 20),
                      child: Text("con",
                      style: TextStyle(fontSize: 35),),
                    ),
                     Container(
                      margin: const EdgeInsets.only(left: 20),
                      child: Row(
                        children: [
                          Text("Agua Sol",
                          style: TextStyle(
                            fontSize: 50,
                            fontFamily: 'Pacifico'),),
                            Container(
                              height: 100,
                              width: 100,
                              
                              child: Lottie.asset('lib/imagenes/party.json'))
                        ],
                      ),
                    ),
                    const SizedBox(height: 20,),
                    Container(
                      margin: const EdgeInsets.only(left:30),
                      //color: Colors.grey,
                      width: 100,
                      height: 150,
                      child: Image.asset('lib/imagenes/logo_sol_tiny.png'),
                    ),
                    const SizedBox(height: 20,),

                    Container(
                      margin: const EdgeInsets.only(left: 20),
                      height: 60,
                      //color:Colors.grey,
                      width: 140,
                      child: ElevatedButton(onPressed: (){},
                       child: Text("<< Menú",
                       style: TextStyle(fontSize: 20,color:Colors.white),),
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all(const Color.fromARGB(255, 1, 34, 60))
                      ),
                       ),

                    ),
                    const SizedBox(height: 20,),
                    Container(
                      //color:Colors.grey,
                      width: 300,
                      height: 400,
                      child: Image.asset('lib/imagenes/reparte.png'),
                    ),
                    

                    
                  ])
            )));}}